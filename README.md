# Explorotron extension for Visual Studio Code

The explorotron is a spiritual successor to [Study lenses](https://github.com/colevandersWands/study-lenses). The extension allows learners to add new perspectives and layers of interactivity on top of existing JavaScript Code. Every lens focuses on a specific aspect of the code that has to be studied. Lenses follow CER best practices such as [PRIMM](https://primmportal.com), scaffolding and expertise reversal. For more information on the theory behind the extension we suggest reading our papers on Computing Education \[[1](https://www.researchgate.net/publication/369142710_Codeschool_in_a_Box_A_Low-barrier_Approach_to_Packaging_Programming_Curricula), [2](https://wise.vub.ac.be/publication/explorotron-ide-extension-guided-and-independent-code-exploration-and-learning)\].

<div align="center">
<img src="https://github.com/yoshimalaise/Explorotron/blob/master/screenshot-vs.png?raw=true" width="" alt="Screenshot" title="Screenshot of the explorotron Visual Studio Code plugin" />
</div>

References

[1] Malaise Y., Cole E., and Signer, B.: "Codeschool in a Box: A Low-barrier Approach to Packaging Programming Curricula", Proceedings of CSEDU 2023, 15th International Conference on Computer Supported Education, Prague, Czech Republic, April 2023

[2] Malaise Y. and Signer B.: "Explorotron: An IDE Extension for Guided and Independent Code Exploration and Learning", Proceedings of Koli Calling 2023, 23rd International Conference on Computing Education Research, Koli, Finland, November 2023

Project was inspired by:
* [Study Lenses](https://github.com/colevandersWands/study-lenses)
* [JS Parsons](https://js-parsons.github.io)
* [Reveal.js](https://revealjs.com)
* [aran](https://github.com/lachrist/aran)
* [qlcjs](https://github.com/teemulehtinen/qlcjs)

## Using the extension
To open a specific JavaScript file using a study lens simply right click on the file and in the study lenses context menu select the lens you which to apply. If the repository you are working in contains any *.presentation.md fiels they will automatically be rendered as presentations using revealjs. Any .studytour files will also automatically be handled by the extension.


<div align="center">
<img src="https://github.com/yoshimalaise/Explorotron/blob/master/screenshot-vs.png?raw=true" width="" alt="Screenshot" title="Screenshot of the explorotron Visual Studio Code plugin" />
</div>

## Get the companion mobile app
The extension can generate exercises for the [JS StudyBuddy](https://play.google.com/store/apps/details?id=be.ac.vub.wise.jsStudyBuddy) mobile application, dowload the free app for android to make use of this feature!

<div align="center">
<img src="https://github.com/yoshimalaise/Explorotron/blob/master/mobile_screenshots.png?raw=true" width="" alt="Screenshot" title="Screenshot of the explorotron Visual Studio Code plugin" />
</div>

## Development

This project was generated with `Angular CLI`, so it can be be used for angular development by default.

To test the extension in vscode context:
```
$ yarn install
$ yarn run build
```

After build process you can press F5 to "Start Debugging" (or: select in menu "Debug" -> "Start Debugging"). A new window will open in which the extension will be running.

## Packaging

To generate extension in `VSIX` format execute the package command:

```
yarn run package
```

Finally the generated VSIX file with VSCode extension should appear in the root folder of your project.