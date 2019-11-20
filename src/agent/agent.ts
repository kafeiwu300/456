import request from 'superagent';

const agent = request.agent();

const unauthorizedRedirect = (req: any) => {
  req.on('response', (res: any) => {
    if (res.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
  });
};

agent.use(unauthorizedRedirect);

export default agent;
