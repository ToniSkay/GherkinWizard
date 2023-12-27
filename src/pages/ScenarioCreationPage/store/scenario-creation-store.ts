import {create} from "zustand";
import {IScenarioItem} from "../types/scenario-item.type";
import {IScenario} from "../types/scenario";
import {ScenarioStatus} from "../../../common/enums/scenario-status.enum";

export interface ScenarioCreationStore {
    scenario: IScenario;
    setScenarioItems: (items: IScenarioItem[]) => void;
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
    setScenarioItems: (items) => set((state) => ({...state, scenario: {...state.scenario, scenarioItems: (state.scenario.scenarioItems || []).concat(items)}})),
    setScenario: (scenario) => set((state) => ({...state, scenario })),
    resetScenario: () => set((state) => ({...state, scenario: {} as IScenario})),
    setIsModalOpen: (isOpen) => set((state) => ({...state, isModalOpen: isOpen})),
}));