import { StillOptions } from './still-camera';
import { StreamOptions } from './stream-camera';
/**
 * Get the command line arguments for `raspistill` or `raspivid` that are common among both
 *
 * @param options Camera options
 */
export declare function getSharedArgs(options: StillOptions | StreamOptions): string[];
