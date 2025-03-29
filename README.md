# Template Tool
EPA Project

## Description
This is a tool to be used to aid communications between parties and standardisation. Users can create a template which can later be used to generate texts such as emails, automating the drafting process. 

Features:
- Create text-based templates with custom free-text fields
- Store and search templates with a search bar
- Use a template, inputting necessary fields, and generating text to copy to clipboard

## Guides
- [Front-end setup guide](./front-end/README.md)
  - [Authentication setup guide](./front-end/authentication/README.md)
- [Back-end setup guide](./back-end/README.md)
  - [Data Service guide](./back-end/data-service/README.md)
  - [Database setup guide](./back-end/db/README.md)


## Branch Management
- <b>main</b>
> Stable/Production code. Squash during merging

- <b>integration</b>
> Used to merge front-end and back-end before main

- <b>front-end</b>
> Carries code for front-end development and prepares features to integrate. Also handles authentication

- <b>back-end</b>
> Carries code for back-end development and prepares features to integrate. Also contains database

Feature branches will link to **back-end**, **front-end** and **db** branches