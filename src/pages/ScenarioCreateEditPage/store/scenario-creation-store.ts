import {create} from "zustand";
import {IScenarioItem} from "../types/scenario-item.type";
import {IScenario} from "../types/scenario";
import {ScenarioStatus} from "../../../common/enums/scenario-status.enum";

export interface ScenarioCreationStore {
    scenario: IScenario;
    setScenarioItems: (items: IScenarioItem[]) => void;
    removeScenarioItem: (id: number) => void;
    setScenario: (items: IScenario) => void;
    resetScenario: () => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const initialScenario: IScenario = {
    id: 0,
    systemName: '',
    name: '',
    description: '',
    status: ScenarioStatus.InProgress,
    createdByUserId: '',
    createdOn: null,
    scenarioItems: [],
}

export const useScenarioCreationStore = create<ScenarioCreationStore>((set) => ({
    scenario: initialScenario,
    isModalOpen: false,
    setScenarioItems: (items: IScenarioItem[]) => set((state) => ({...state, scenario: {...state.scenario, scenarioItems: (state.scenario.scenarioItems || []).concat(items)}})),
    removeScenarioItem: (id: number) => set((state) => ({...state, scenario: {...state.scenario, scenarioItems: (state.scenario.scenarioItems.filter((item) => item.id !== id))}})),
    setScenario: (scenario) => set((state) => ({...state, scenario })),
    resetScenario: () => set((state) => ({...state, scenario: {} as IScenario})),
    setIsModalOpen: (isOpen) => set((state) => ({...state, isModalOpen: isOpen})),
}));