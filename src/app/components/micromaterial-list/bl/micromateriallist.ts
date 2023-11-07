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
        },
        {
            name: "JavaScript Array Explorer",
            description: "Find the array method you need without digging through the docs.",
            url: "https://arrayexplorer.netlify.app",
            tags: ['javascript', 'arrays'],
            github: "https://github.com/sdras/array-explorer"
        },
        {
            name: "JavaScript Object Explorer",
            description: "Find the object method you need without digging through the docs.",
            url: "https://objectexplorer.netlify.app",
            tags: ['javascript', 'objects', 'datastructures'],
            github: "https://github.com/sdras/object-explorer"
        },
        {
            name: 'Cron Trigger',
            description: 'This is a micromaterial to practice both reading and writing cron expressions. There are cron reading exercises in which you need to select the right schedule matching the cron and there are writing exercises in which a cron needs to be constructed by rearranging blocks.',
            url: 'https://cron-trigger.netlify.app',
            tags: ['cron', 'linux'],
            github: 'https://github.com/lpmi-13/cron-trigger'
        },
        {
            name: 'Semantic Versioning Questions',
            description: 'This is a micromaterial to practice reading and understanding semantic versioning (semver). It\'s based on the questions template by the amazing Julia Evans.',
            url: 'https://semver-questions.netlify.app',
            tags: ['versioning'],
            github: 'https://github.com/lpmi-13/semver-questions'
        },
        {
            name: 'SQL Murder Mystery',
            description: `There's been a Murder in SQL City! The SQL Murder Mystery is designed to be both a self-directed lesson to learn SQL concepts and commands and a fun game for experienced SQL users to solve an intriguing crime.`,
            url: 'https://mystery.knightlab.com',
            tags: ['SQL']
        }
    ];

    return materials;
}