import Weapons from "../pages/Weapons";
import Boxes from '../pages/Boxes';
import StakeNft from '../pages/StakeNft';
import StakeGun from '../pages/StakeGun';
import Farm from '../pages/Farm';

var routes = [
    {
        path: "/",
        name: "Weapons",
        component: Weapons,
    },
    {
        path: '/boxes',
        name: "Boxes",
        component: Boxes,
    },
    {
        path: "/stakeNft",
        name: "StakeNFt",
        component: StakeNft,
    },
    {
        path: "/stakeGun",
        name: "StakeGun",
        component: StakeGun,
    },
    {
        path: "/farm",
        name: "Farm",
        component: Farm,
    }
];

export default routes;