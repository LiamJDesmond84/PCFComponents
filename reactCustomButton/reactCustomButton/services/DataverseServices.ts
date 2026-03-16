import { IInputs } from "../generated/ManifestTypes";

export let _context: ComponentFramework.Context<IInputs>

export const setContext = (context: ComponentFramework.Context<IInputs>) => {
    _context = context;
}