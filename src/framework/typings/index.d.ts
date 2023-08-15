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
    type Movement = (
        | 'MOVE_UP'
        | 'MOVE_DOWN'
        | 'MOVE_LEFT'
        | 'MOVE_RIGHT'
    )

     type Command = {
        name: string
        category: Category
        action: (entity: import('../Interfaces/Commandable').default) => void
    }
}