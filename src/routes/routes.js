import DroneList from '../components/Views/DroneList'
import DroneOverview from '../components/Views/DroneOverview'
import NotFound from '../components/GeneralViews/NotFoundPage'

const routes = [
  {
    path: '/',
    component: DroneList
  },
  {
    path: '/drone/:id',
    component: DroneOverview
  },
  {
    path: '*',
    component: NotFound
  }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Shop/Views/' + name + '.vue');
   return res;
};**/

export default routes
