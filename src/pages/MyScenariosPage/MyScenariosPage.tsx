import "./MyScenariosPage.scss";
import {ScenarioCard} from "./components/ScenarioCard/ScenarioCard";
import {finalize, from} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {environment} from "environments";
import {useUserStore} from "stores";
import {IScenario} from "../ScenarioCreateEditPage/types/scenario";
import {useEffect, useState} from "react";
import {Loader} from "components";

export function MyScenariosPage() {
  const userId = useUserStore((state) => state.systemName);

  const [scenarios, setScenarios] = useState<IScenario[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const updateScenarios = () => {
    setPageLoading(true);

    from(axios.get(`${environment.baseApiUrl}get-scenarios/${userId}`))
        .pipe(finalize(() => setPageLoading(false)))
        .subscribe(({data}: AxiosResponse<IScenario[]>) => setScenarios(data));
  }

  useEffect(() => updateScenarios(), []);

  if (pageLoading) return (<Loader/>);

  return (
      <div className="my-scenarios-container">
        {scenarios?.map((task) => (
            <ScenarioCard setPageLoading={setPageLoading} updateScenarios={updateScenarios} key={task.id} item={task}></ScenarioCard>
        ))}
      </div>
  );
}
