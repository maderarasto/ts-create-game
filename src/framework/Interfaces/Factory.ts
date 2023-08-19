/**
 * Provides funcionality for creating T objects which constructor are registered by K key.
 */
export default interface Factory<K extends string, T> {
    /**
     * Register a constructor for creating object on request identified by key.
     * 
     * @param key key for accessing contrustor
     * @param constructor construtor of T class
     */
    register(key: K, constructor: Core.Constructor<T>): void;

    /**
     * Create a T object registered by K key.
     * 
     * @param key key of register class construtor.
     */
    create(key: K, ...args: any[]): T;
}