
import { MODULES } from '../modules';
import { ContentStatus } from '../../types';

export const LEGACY_MODULES = MODULES.filter(m => m.status === ContentStatus.Active);
export const REDESIGN_MODULES = MODULES.filter(m => m.status !== ContentStatus.Active);
