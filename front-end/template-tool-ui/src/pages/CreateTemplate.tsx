import { Link, useNavigate } from "react-router";
import BackButton from "../components/buttons/BackButton";
import TextEditor from "../components/textEditor/TextEditor";
import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import RenderModeView from "../components/textEditor/RenderModeView";
import { useNotification } from "../context/notification/useNotification";
import { NotificationType } from "../types/notificationTypes";
import { dateToMysqlDatetime } from "../utils/dateFormatter";
import { useDispatchContext, useStateContext } from "../context/data/useData";
import SelectInput from "../components/SelectInput";
import { Team } from "../models/team";
import { createTemplate } from "../context/data/actions/templateActions";
import { TempTemplate } from "../models/template";

function CreateTemplate() {
  const navigate = useNavigate();
  const {addNotification} = useNotification();
  const editorRef = useRef<Editor | null>(null); // reference to tiptap editor for save & copy functionality
  const copyRef = useRef<HTMLDivElement | null>(null); // reference to hidden div designed for copying rendered content
  const [showEditor, setShowEditor] = useState(false); // to prevent editor from remounting on every render
  const dispatch = useDispatchContext();
  const state = useStateContext();
  const [name, setName] = useState<string>('');
  const [team, setTeam] = useState<string>('N/A');
  const [editable, setEditable] = useState<string>('Members can edit');
  const [detail, setDetail] = useState<string>('');
  const [invalidCreate, setInvalidCreate] = useState<boolean>(false);

  const teamsWithPerms = state.teamState.teamsByUser?.flat().filter(team => team.ownerIds?.includes(state.userState.userDetails?.id ?? -1)); 

  const handleSave = () => {
    if (!name.trim()) {
      addNotification('Template name cannot be empty', NotificationType.ERROR);
      setInvalidCreate(true);
      return;
    }
    if (!detail.trim()) {
      addNotification('Template description cannot be empty', NotificationType.ERROR);
      setInvalidCreate(true);
      return;
    }
    if (team === 'N/A') {
      addNotification('Please select a team', NotificationType.ERROR);
      setInvalidCreate(true);
      return;
    }
    if (state.userState.userDetails?.id === undefined) {
      addNotification('User details not found', NotificationType.ERROR);
      setInvalidCreate(true);
      return;
    }
    const selectedTeam = teamsWithPerms?.find(teamWithPerm => teamWithPerm.teamName === team);
    if (!selectedTeam) {
      addNotification('Team not found', NotificationType.ERROR);
      setInvalidCreate(true);
      return;
    }
    if (editorRef.current) {
      const content = editorRef.current.getJSON();
      const timeOfUpdate = dateToMysqlDatetime(new Date());
      // Create a new template object
      const newTemplate: TempTemplate = {
        id: -1, // -1 indicates a new template to be created
        title: name,
        detail: detail,
        ownerId: state.userState.userDetails.id,
        content: JSON.stringify(content),
        teamId: selectedTeam.id, // Use the selected team's id directly
        lastAmendDate: timeOfUpdate,
        editable: editable === 'Members can edit'
      };
      createTemplate(newTemplate, dispatch);
    }
  }

  // When the user selects a team from the dropdown
  const selectTeamFilterChanged = useCallback((selectedTeam: string) => {
    if (teamsWithPerms && teamsWithPerms.length > 0) {
      const filteredTeam = teamsWithPerms.find(team => team.teamName === selectedTeam); // current selected team
      setTeam(filteredTeam?.teamName ?? 'N/A'); // Set team to selected team or 'N/A' if not found
    } else {
      setTeam('N/A'); // If no teams are available, set team to 'N/A'
    }
  }, [state.teamState.teamsByUser]);

  // When the user selects permission from the dropdown
  const selectMemberPermissionChanged = useCallback((editPerm: string) => {
    setEditable(editPerm); // Set editable to selected permission
  }, [state.teamState.teamsByUser]);

  // Prevents editor from remounting until react render is completed
  useEffect(() => {
    setTeam(teamsWithPerms?.[0]?.teamName ?? 'N/A'); // Set default team to first team with permissions
    setShowEditor(false);
    // Defer mounting to next tick
    const timeout = setTimeout(() => setShowEditor(true), 0);
    return () => clearTimeout(timeout);
}, []);

  // When the POST Create Template API call returns
  useEffect (() => {
    if(state.templateState.createTemplate && state.teamState.teamsByUser) {
      addNotification('Template created successfully!', NotificationType.SUCCESS);
      state.templateState.resetCreateTemplate(); // reset createTemplate to null to prevent re-rendering
      navigate("/");
    }
    else if (state.templateState.error) {
      addNotification(`Error creating template: ${state.templateState.error}`, NotificationType.ERROR);
    }
  }, [state.templateState.createTemplate, addNotification]);

  return (
    <div className="p-2 pl-1 pr-1 w-full sm:w-6/7 mx-auto self-start h-full">
      <div className="border rounded-lg shadow-lg p-3 bg-white dark:bg-gray-800 h-full flex flex-col">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex justify-start gap-4">
              <Link to="/">
                <BackButton />
              </Link>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <h3 className="text-left ">Creating Template:</h3>
                </div>
                <div className="align-middle items-center self-center">
                  <input
                    type="text"
                    className={`border rounded px-2 py-1 sm:px-2 ${invalidCreate && name.length < 1 ? 'border-red-500' : ''}`}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6 py-1">
              <SelectInput value={team} onChange={selectTeamFilterChanged} options={teamsWithPerms?.map((team: Team) => team.teamName) ?? []} label='Team:'></SelectInput>
              <SelectInput value={editable} onChange={selectMemberPermissionChanged} options= {["Members can edit", "Members can't edit"]} label='Editable:'></SelectInput>
            </div>
            <div className="py-1 pb-2">
              <label className="text-left">Description: </label>
              <input
                type="text"
                className={`border rounded w-4/6 px-2 py-1 sm:px-2 ${invalidCreate && detail.length < 1 ? 'border-red-500' : ''}`}
                placeholder="Brief description of template..."
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>
          </div>
          <div className="align-middle self-center">
            <button className="bg-green-500 text-white p-2 sm:p-3 px-3 sm:px-5 rounded w-full" onClick={handleSave}>
              Create
            </button>
          </div>
        </div>
        <hr />
          {showEditor && (
              <div className="flex justify-start gap-3 mt-2 flex-grow">
                <div className="text-left w-full h-full flex flex-col pb-2">
                  <TextEditor 
                  content={{ type: "doc", content: [] }} 
                  setEditorRef={editor => (editorRef.current = editor)}/>
                </div>
                <div ref={copyRef} className="hidden">
                  <RenderModeView content={editorRef.current?.getJSON()} /> 
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
export default CreateTemplate;