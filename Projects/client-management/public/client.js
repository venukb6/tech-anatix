document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    const Dashboard = document.getElementById('dashboard-page');
    const Clients = document.getElementById('clients-page');
    const Projects = document.getElementById('projects-page');

    const serverUrl = 'http://localhost:5000'

    // Dashboard.addEventListener('click', () => {
    //     content.innerHTML = `
    //         <h1> Dashboard <h1>
    //         <h3> Welcome to Client Management Dashboard <h3>

    //     `
    // })

    const loadDashboard = () => {
        content.innerHTML = `
          <h2>Dashboard</h2>
          <p>Welcome to the Client Management Dashboard</p>
        `;
      };

    const loadClients = () => {
        axios.get(`${serverUrl}/clients`)
        .then(response => {
            const clients = response.data;
            content.innerHTML = `
            <h2>Clients</h2>
            <form id="client-form">
                <div>
                <label for="client-name">Name:</label>
                <input type="text" id="client-name" name="name" required>
                </div>
                <div>
                <label for="client-email">Email:</label>
                <input type="email" id="client-email" name="email" required>
                </div>
                <div>
                <label for="client-phone">Phone:</label>
                <input type="text" id="client-phone" name="phone" required>
                </div>
                <button type="submit">Add Client</button>
            </form>
            <div id="clients-list"></div>
        `;
        const clientForm = document.getElementById('client-form');
        clientForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const formData = new FormData(clientForm);
          const clientData = {};
          formData.forEach((value, key) => {
            clientData[key] = value;
          });

          axios.post(`${serverUrl}/clients`, clientData)
            .then(response => {
              loadClients(); 
            })
            .catch(err => {
              console.error(err);
              alert(err)
            //   alert('Error adding client:');
            });
        });

        const clientsList = document.getElementById('clients-list');
        clientsList.innerHTML = clients.map(client => `
          <div>
            <h3>${client.name}</h3>
            <p>Email: ${client.email}</p>
            <p>Phone: ${client.phone}</p>
          </div>
        `).join('');
      })
      .catch(err => {
        console.error(err);
        alert('Error loading clients');
      });
  };
        


  const loadProjects = () => {
    axios.get(`${serverUrl}/projects`)
      .then(response => {
        const projects = response.data;
        return axios.get(`${serverUrl}/clients`)
          .then(response => {
            const clients = response.data;
            content.innerHTML = `
              <h2>Projects</h2>
              <form id="project-form">
                <div>
                  <label for="project-title">Title:</label>
                  <input type="text" id="project-title" name="title" required>
                </div>
                <div>
                  <label for="project-description">Description:</label>
                  <input type="text" id="project-description" name="description" required>
                </div>
                <div>
                  <label for="project-status">Status:</label>
                  <select id="project-status" name="status" required>
                    <option value="Planning">Planning</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label for="project-deadline">Deadline:</label>
                  <input type="date" id="project-deadline" name="deadline" required>
                </div>
                <div>
                  <label for="project-client">Client:</label>
                  <select id="project-client" name="client" required>
                    ${clients.map(client => `<option value="${client._id}">${client.name}</option>`).join('')}
                  </select>
                </div>
                <button type="submit">Add Project</button>
              </form>
              <div id="projects-list"></div>
            `;

            const projectForm = document.getElementById('project-form');
            projectForm.addEventListener('submit', (e) => {
              e.preventDefault();
              const formData = new FormData(projectForm);
              const projectData = {};
              formData.forEach((value, key) => {
                projectData[key] = value;
              });

              axios.post(`${serverUrl}/projects`, projectData)
                .then(response => {
                  loadProjects(); 
                })
                .catch(err => {
                  console.error(err);
                  alert('Error adding project');
                });
            });

            const projectsList = document.getElementById('projects-list');
            projectsList.innerHTML = projects.map(project => `
              <div>
                <h3>${project.title}</h3>
                <p>Description: ${project.description}</p>
                <p>Status: ${project.status}</p>
                <p>Deadline: ${new Date(project.deadline).toLocaleDateString()}</p>
              </div>
            `).join('');
          });
      })
      .catch(err => {
        console.error(err);
        alert('Error loading projects');
      });
  };

  document.getElementById('dashboard-page').addEventListener('click', loadDashboard);
  document.getElementById('clients-page').addEventListener('click', loadClients);
  document.getElementById('projects-page').addEventListener('click', loadProjects);

  loadDashboard();


})