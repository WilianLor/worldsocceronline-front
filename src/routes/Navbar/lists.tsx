import {
  Assignment,
  TableChart,
  Apartment,
  DateRange,
  People,
  Settings,
  AttachMoney,
  SupervisorAccount,
  Search,
  AccountBalance,
  EmojiPeople,
  Autorenew,
  GroupAdd,
  Add,
  Payment,
} from "@material-ui/icons";

export const coachWithTeamList = [
  {
    title: "Plantel",
    icon: <Assignment />,
    route: "#",
  },
  {
    title: "Tabelas",
    icon: <TableChart />,
    route: "#",
  },
  {
    title: "Instalações de treinamento",
    icon: <Apartment />,
    route: "#",
  },
  {
    title: "Calendário",
    icon: <DateRange />,
    route: "#",
  },
  {
    title: "Escalação",
    icon: <People />,
    route: "#",
  },
  {
    title: "Táticas",
    icon: <Settings />,
    route: "#",
  },
  {
    title: "Diretoría",
    icon: <SupervisorAccount />,
    route: "#",
  },
  {
    title: "Pesquisar Jogador",
    icon: <Search />,
    route: "#",
  },
  {
    title: "Negociações",
    icon: <Autorenew />,
    route: "/coachtenders",
  },
  {
    title: "Buscar time",
    icon: <Search />,
    route: "/findteam",
  },
];

export const presidentWithTeamList = [
  {
    title: "Plantel",
    icon: <Assignment />,
    route: "#",
  },
  {
    title: "Tabelas",
    icon: <TableChart />,
    route: "#",
  },
  {
    title: "Estádio",
    icon: <AccountBalance />,
    route: "#",
  },
  {
    title: "Calendário",
    icon: <DateRange />,
    route: "#",
  },
  {
    title: "Técnico",
    icon: <EmojiPeople />,
    route: "#",
  },
  {
    title: "Buscar time",
    icon: <Search />,
    route: "/findteam",
  },
  {
    title: "Patrocinadores",
    icon: <Payment />,
    route: "/sponsorship",
  },
  {
    title: "Balanço do clube",
    icon: <AttachMoney />,
    route: "/clubbalance",
  },
  {
    title: "Negociações com Treinadores",
    icon: <Autorenew />,
    route: "/coachtenders",
  },
  {
    title: "Buscar Treinador",
    icon: <Search />,
    route: "/findcoach",
  },
  {
    title: "Funcionário",
    icon: <GroupAdd />,
    route: "#",
  },
];

export const coachWithoutTeam = [
  {
    title: "Buscar time",
    icon: <Search />,
    route: "/findteam",
  },
  {
    title: "Negociações com Times",
    icon: <Autorenew />,
    route: "/coachtenders",
  },
];

export const presidentWithoutTeam = [
  {
    title: "Buscar time",
    icon: <Search />,
    route: "/findteam",
  },
];

export const noProfessionList = [
  {
    title: "Escolher Profissão",
    icon: <Add />,
    route: "/choise",
  },
];
