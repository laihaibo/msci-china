import { init, saveOne, editOne, fetchAll } from './src/utils/db';

import ShareModel from './src/model/ShareModel';

const data = fetchAll('shares');
