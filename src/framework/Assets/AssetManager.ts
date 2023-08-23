type AssetType = 'image';
type Asset = HTMLImageElement;
type AssetMap = Map<string, Asset>;

/**
 * Represents manager that can load and maintain assets for application.
 */
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
    
    /**
     * Load an image from path a store it with given unique key.
     * 
     * @param path path to image file
     * @param key unique key
     * @returns promised result
     */
    async loadImage(path: string, key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            if (this.imageAssets.has(key)) {
                reject(
                    new Error(`Asset with key ${key} already exists!`)
                );
            }
            
            request.open('GET', path, true);
            request.responseType = 'blob';
            request.onreadystatechange = () => {
                if (request.status === 200 && request.readyState === XMLHttpRequest.DONE) {
                    console.log(request.responseURL);
                    if (!this.checkAssetSupport(request.responseURL)) {
                        reject(
                            new Error(`Asset Manager does not support file extension for file ${path}!`)
                        );
                    }

                    const image = new Image();
                    image.onload = (() => {
                        this.imageAssets.set(key, image);
                        resolve();
                    })
                    
                    image.src = URL.createObjectURL(request.response);
                } else if (request.status === 404) {
                    reject(
                        new Error(`File not found with path ${path}!`)
                    );
                }
            }

            request.send();
        })
    }

    /**
     * Access to assets by its type and unique key.
     * 
     * @param type type of asset
     * @param key unique key
     * @returns asset
     */
    get(type: AssetType, key: string): Asset|undefined {
        const manager = this.managersMap.get(type);

        if (!manager?.has(key)) {
            throw new Error(`Image asset with key ${key} not found!`);
        }

        return manager?.get(key);
    }

    /**
     * Clear assets. If type is provided then clear only assets for specific type.
     * 
     * @param type type of assets
     */
    clear(type?: AssetType) {
        if (type !== undefined) {
            const manager = this.managersMap.get(type);
            manager?.clear();
        }

        this.managersMap.forEach((assets) => {
            assets.clear();
        })
    }

    /**
     * Checks if file can be stored in asset manager by its file extension.
     * 
     * @param path path to file
     * @returns boolean result
     */
    private checkAssetSupport(path: string): boolean {
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