const Routes = {
  INDEX: '/',
  HELP: '/help',
  SCORES: {
    INDEX: '/scores',
    NEW: '/scores/new',
    SHOW: '/scores/:id(\\d+)',
  },
};

export default Routes;
