import Home from '../pages/Home';
import TableLearn from '../pages/TableLearn';
import FormItem from '../pages/FormItem';
import Hooks from '../pages/Hooks';


const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/form",
    component: FormItem
  },
  {
    path: "/table",
    component: TableLearn
  },
  {
    path: "/hooks",
    component: Hooks
  }
];

export default routes;
