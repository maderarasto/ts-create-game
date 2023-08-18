/**
 * Represents an entity that can be execute commands.
 */
export default interface Commandable {
    /**
     * Handle command.
     */
    onCommand(command: Entities.Command): void;
}