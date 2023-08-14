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
}