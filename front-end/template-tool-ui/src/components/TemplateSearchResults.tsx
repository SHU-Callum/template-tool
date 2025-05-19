import { Link } from "react-router";
import { useStateContext } from "../context/data/useData";
import { Template, TemplateWithTeamName } from "../models/template";
import { addTeamNameToTemplates, templateIsEditable } from "../utils/idToName";

interface TemplateSearchResultsProps {
  results: Template[];
  criteria: { teams: string, text: string, includeViewOnly: string }
}

function TemplateSearchResults({ results, criteria }: TemplateSearchResultsProps) {
  const state = useStateContext();
  // Format the results to include team names
  const formattedTemplates: TemplateWithTeamName[] = addTeamNameToTemplates(results, state.teamState.teamsByUser || []);
  return (
    <div>
      <div className="flex justify-between items-center mb-3 pl-1 pr-1">
        <h3 className="align-middle">Search Results ({results.length})</h3>
         {criteria.text.length > 0 ? (
            <p className="text-xs sm:text-sm text-gray-500 align-middle">Team: <b>{criteria.teams}</b>, Text: <b>{criteria.text}</b>, Include View-only: <b>{criteria.includeViewOnly}</b></p>
          ) : (
            <p className="text-xs sm:text-sm text-gray-500 align-middle">Team: <b>{criteria.teams}</b>, Include View-only: <b>{criteria.includeViewOnly}</b></p>
          )}
      </div>
      
      {results.length == 0 ? (<p className="font-semibold">No associated templates</p>) : (
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-1 px-2 border">Name</th>
                <th className="py-1 px-2 border">Team</th>
                <th className="py-1 px-2 border">Action</th>
                <th className="py-1 px-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {formattedTemplates.map((template, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-1 px-2 border w-1/5">{template.title}</td>
                  <td className="py-1 px-2 border w-2/5">{template.detail}</td>
                  <td className="py-1 px-2 border w-1/5">{template.teamName}</td>
                  <td className="py-1 px-2 border w-1/5">
                    <div className="flex justify-center gap-1">
                    {/* Edit Template Button*/}
                    {templateIsEditable(template, state.userState.userDetails, state.teamState.teamsByUser || []) && (
                      <button className="text-blue-500 hover:text-blue-700 p-2">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                        </svg>
                      </button>
                    )}
                      {/* Open Template Button*/}
                      <Link to="/view-template" state={{template}}>
                        <button className="text-blue-500 hover:text-blue-700 p-2">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default TemplateSearchResults;
