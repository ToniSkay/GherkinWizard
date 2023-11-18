import {create} from "zustand";
import {IScenarioItem} from "../types/scenario-item.type";

export interface ScenarioCreationStore {
    scenarioItems: IScenarioItem[];
    setScenarioItems: (items: IScenarioItem[]) => void;
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