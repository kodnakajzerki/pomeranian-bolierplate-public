import { getParsedRouterDataList } from '../../router-data/parseRouterData';

import { SubRouteExampleMetaData } from './SubRouteExample/router-data';
import { ReactOnClickRouterData } from './ReactOnCLick/router-data';
import { ReactOnChangeRouterData } from './ReactOnChange/router-data';
import { ReactIfStatementMetaData } from './ReactIfStatement/router-data';
import { ReactGuessNumberMetaData } from './ReactGuessNumber/router-data';
import { blockRouterMetaData as blockRouterMetaDataHitTheMole } from './HitTheMole/router-data';
import { blockRouterMetaData as blockRouterMetaDataToDoWithServer } from './ToDoWithServer/router-data';
import { blockRouterMetaData as blockRouterMetaDataToDo } from './ToDoWithServer2/router-data';
import { blockRouterMetaData as blockRouterMetaDataBasicForms } from './BasicForms/router-data';
import { blockRouterMetaData as blockRouterMetaDataReactHookBasicForms } from './ReactHookBasicForms/router-data';

export const blockRouterMetaData = [
  SubRouteExampleMetaData,
  ReactOnClickRouterData,
  ReactOnChangeRouterData,
  ReactIfStatementMetaData,
  ReactGuessNumberMetaData,
  blockRouterMetaDataHitTheMole,
  blockRouterMetaDataToDoWithServer,
  blockRouterMetaDataToDo,
  blockRouterMetaDataBasicForms,
  blockRouterMetaDataReactHookBasicForms,
];
export const blockRouterData = getParsedRouterDataList(blockRouterMetaData);
