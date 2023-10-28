import {create} from "zustand";
import {IScenario} from "../types/scenario.type";

export interface ScenarioCreationStore {
    scenarioItems: IScenario[];
    setScenarioItems: (items: IScenario[]) => void;
    resetScenarioItems: () => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export const useScenarioCreationStore = create<ScenarioCreationStore>((set) => ({
    scenarioItems: [],
    setScenarioItems: (items) => set((state) => ({...state, scenarioItems: state.scenarioItems.concat(items)})),
    resetScenarioItems: () => set((state) => ({...state, scenarioItems: []})),
    isModalOpen: false,
    setIsModalOpen: (isOpen) => set((state) => ({...state, isModalOpen: isOpen})),
}));