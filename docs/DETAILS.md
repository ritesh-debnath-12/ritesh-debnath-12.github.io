# Repository Details
This file exists for Neko's eyes...is what I would like to say, but I can't stop you from looking now, can I?

## Table of Contents
- [Design](#design)
- [Rules](#rules)
- [Adding Data in Skills](#adding-data-in-skills)
- [Adding Data in Projects](#adding-data-in-projects)
- [Adding Data in Hobbies](#adding-data-in-hobbies)


## Design
This portfolio has been inspired from one and only one image....[this](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcolorlib.com%2Fwp%2Fwp-content%2Fuploads%2Fsites%2F2%2Frainfo-minimal-website-template.jpg&f=1&nofb=1&ipt=6e872309179b3032c6b5a780996d9567e97fb09c99815794ede00bf14609ef64).
Its design document is [this](design/PORTFOLIO.json).

There is no UML or Flowchart for this project. A JSON file was created just so that the design could be easily understood and modified. Please understand that the JSON file may have things not necessarily corresponding to the final implementation, because it sole purpose was to be a baseline for a minimum value/viable product.

## Rules
1) Do not change the hero image, it is carefully placed with appropriate (W x H).
2) Do not modify the design of an existing section UNLESS ABSOLUTELY NECESSARY...this stuff is on a knife's edge.
3) Contact section should be the last section.
4) DO NOT ADD STATIC DISPLAYABLE VALUES INSIDE THESE SECTIONS:
    - Skills
    - Projects
    - Hobbies
5) Continuing Rule-4, to add values, use the JSON files for the corresponding sections.
    - [Skills](../src/assets/json/skills_data.json)
    - [Projects](../src/assets/json/projects_data.json)
    - [Hobbies](../src/assets/json/hobbies_data.json)

6) Continuing Rule-4,5. Read the subsection of how to add data in appropriate JSON files below.

## Adding Data in Skills
For this, you should be concerned about these two files:
- [skills_data.json](../src/assets/json/skills_data.json)
- [SymbolLookUpTable.ts](../src/components/Skills/util/SymbolLookUpTable.ts)

The former is for the data, the latter is for mapping icon names to their corresponding React components.

## Adding Data in Projects
For this, you should be concerned about these two files:
- [projects_data.json](../src/assets/json/projects_data.json)

Just add the data, and some tags, and you are done!

## Adding Data in Hobbies
For this, you should be concerned about these two files:
- [hobbies_data.json](../src/assets/json/hobbies_data.json)
- [SymbolLookUpTable.ts](../src/components/Hobbies/util/SymbolLookUpTable.ts)

Same as Skills, the former is for the data, the latter is for mapping icon names to their corresponding React components.