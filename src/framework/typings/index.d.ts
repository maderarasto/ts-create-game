namespace Core {
    type AppConfig = {
        name: string

        default: {
            width: number,
            height: number
        }
    }
}

namespace Entities {
    type Category = (
        | 'Entity'
        | 'Enemy'     
        | 'Player'  
    );

    export type Command = {
        name: string
        category: Category
        action: (command: import('../Interfaces/Commandable').default) => void
    }
}