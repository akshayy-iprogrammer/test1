import { combineReducers } from 'redux';

import splashReducer from '../../Screens/Splash/reducer';
import PipelineReducer from '../../Screens/MyPipeline/reducer';
import newsReducer from '../../Screens/News/reducer';
import feedsReducer from '../../Screens/NewsFeeds/reducer';
import salesCommunityReducer from '../../Screens/Sales/reducer';

const RootReducer = combineReducers({
    splash: splashReducer,
    pipeline: PipelineReducer,
    news: newsReducer,
    feeds: feedsReducer,
    salesCommunity : salesCommunityReducer
});
export default RootReducer;