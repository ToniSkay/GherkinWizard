import "./MyScenariosPage.scss";
import {ScenarioCard} from "./components/ScenarioCard/ScenarioCard";
import {finalize, from} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {environment} from "../../environments/index";
import {useUserStore} from "../../common/stores/user-store";
import {IScenario} from "../ScenarioCreateEditPage/types/scenario";
import {useEffect, useState} from "react";
import {Loader} from "common-components";

export function MyScenariosPage() {
  const userId = useUserStore((state) => state.systemName);

  const [scenarios, setScenarios] = useState<IScenario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updateScenarios = () => {
    setLoading(true);

    from(axios.get(`${environment.baseApiUrl}get-scenarios/${userId}`))
        .pipe(finalize(() => setLoading(false)))
        .subscribe(({data}: AxiosResponse<IScenario[]>) => setScenarios(data));
  }

  useEffect(() => updateScenarios(), []);

  if (loading) return (<Loader/>);

  return (
      <div className="all-tasks-container">
        {scenarios?.map((task) => (
            <ScenarioCard setLoading={setLoading} updateScenarios={updateScenarios} key={task.id} item={task}></ScenarioCard>
        ))}
      </div>

  );
}
