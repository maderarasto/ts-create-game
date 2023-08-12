type AssetType = 'image';
type Asset = HTMLElement;
type AssetMap = Map<string, Asset>;

export default class AssetManager {
    private static readonly SUPPORTED_IMAGE_EXT = ['.png', '.jpeg', '.jpg', '.gif', '.bmp', '.webp'];

    private imageAssets: Map<string, HTMLImageElement>;
    private managersMap: Map<AssetType, AssetMap>;

    constructor() {
        this.imageAssets = new Map();
        this.managersMap = new Map([
            ['image', this.imageAssets]
        ]);
    }
    
    async loadImage(path: string, key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            if (this.imageAssets.has(key)) {
                reject(
                    new Error('Asset with given key already exists!')
                );
            }
            
            request.open('GET', path, true);
            request.responseType = 'blob';
            request.onreadystatechange = () => {
                if (request.status === 200 && request.readyState === XMLHttpRequest.DONE) {
                    console.log(request.responseURL);
                    if (!this.checkAssetSupport(request.responseURL)) {
                        reject(
                            new Error('Asset Manager does not support this file extension!')
                        );
                    }

                    const image = new Image();
                    image.src = URL.createObjectURL(request.response);
                    this.imageAssets.set(key, image);
                    resolve();
                } else if (request.status === 404) {
                    reject(
                        new Error('File not found with given path!')
                    );
                }
            }

            request.send();
        })
    }

    get(type: AssetType, key: string): Asset|undefined {
        const manager = this.managersMap.get(type);

        if (!manager?.has(key)) {
            throw new Error('Image asset with given key not found!');
        }

        return manager?.get(key);
    }

    clear(type?: AssetType) {
        if (type !== undefined) {
            const manager = this.managersMap.get(type);
            manager?.clear();
        }

        this.managersMap.forEach((assets) => {
            assets.clear();
        })
    }

    private checkAssetSupport(path: string) {
        let supported = false;

        const fileRegex = /([A-Za-z0-9 ()_\-,.*]*)([.][A-Za-z0-9]+)$/g;
        const [fileName, _, ext] = [...path.matchAll(fileRegex)][0] ?? [] ;

        if (!fileName) {
            return supported;
        }

        if (AssetManager.SUPPORTED_IMAGE_EXT.includes(ext)) {
            supported = true;
        }
        
        return supported;
    }
}