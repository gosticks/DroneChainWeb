const routes = [
  // {
  //   path: '/',
  //   component: COMPONENT_NAME,
  //   redirect: OPTIONAL_REDIRECT
  //   children: [OPTINAL_CHILDREN]
  // },
  // Not Found example
  // { path: '*', component: NotFound }
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
