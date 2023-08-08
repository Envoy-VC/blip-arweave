import { SmartWeaveGlobal as SmartWeave } from 'warp-contracts';

// declare class SmartWeave as global
declare global {
	const SmartWeave: SmartWeave;
}
