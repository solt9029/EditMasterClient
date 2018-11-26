const routes = {
  INDEX: '/',
  HELP: '/help',
  SCORES: {
    INDEX: '/scores',
    NEW: '/scores/new',
    SHOW: '/scores/:id(\\d+)',
  },
};

export default routes;
