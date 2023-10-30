import { MicroMaterial } from "../model/micromaterial.interface";

export function loadMicromaterials(): MicroMaterial[] {
    const materials: MicroMaterial[] = [
        {
            name: 'King\'s Scroll',
            description: `King's Scroll: The Search for the Chosen One is a small game that aims to help students practise their code prediction abilities. The game uses a simple story set in a medieval fantasy kingdom to create a welcoming, less intimidating environment.
            Users are presented with randomly generated pieces of JavaScript code that modify four core Boolean variables (sword, helmet, shield, cape). Making use of the state tables the students can walk through the code by hand and predict the end result. The user ends the round by selecting the hero that matches the description of the final state of the variables. The game allows the user to indicate which language features are known, so the generated JavaScript is understandable by a broad variety of students.`,
            url: 'https://kings-scroll.netlify.app',
            tags: ['javascript', 'tracing', 'game'],
            github: 'https://github.com/yoshimalaise/kings-scroll'
        },
        {
            name: 'CSS Selectors Explained',
            description: 'This micromaterial allows you to enter any valid CSS selector and it will translate into a description of what the selector does in plain English.',
            url: 'https://in-tech-gration.github.io/WDX-180/resources/css/selectors-explained/index.html',
            tags: ['css', 'css selectors'],
            github: 'https://github.com/KittyGiraudel/selectors-explained'
        }
    ];

    return materials;
}