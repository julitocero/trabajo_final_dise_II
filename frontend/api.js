// Configuración de APIs
const API = {
    auth: 'http://localhost:4001/api/auth',
    personsCreate: 'http://localhost:4010/api/persons',
    personsRead: 'http://localhost:4011/api/persons',
    personsUpdate: 'http://localhost:4012/api/persons',
    personsDelete: 'http://localhost:4013/api/persons',
    logs: 'http://localhost:4003/api/logs'
};


// Utilidad para hacer requests
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options
        });
        const data = await response.json();
        return { success: response.ok, data, status: response.status };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Módulo de Autenticación
const AuthAPI = {
    async signup(name, email, password) {
        return apiRequest(`${API.auth}/signup-direct`, {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });
    },

    async login(email, password) {
        return apiRequest(`${API.auth}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },

    async logout() {
        return apiRequest(`${API.auth}/logout`, { method: 'POST' });
    },

    async verify() {
        return apiRequest(`${API.auth}/verify`, { method: 'GET' });
    }
};

// Módulo de Personas
const PersonsAPI = {
    async create(personData) {
        return apiRequest(`${API.personsCreate}`, {
            method: 'POST',
            body: JSON.stringify(personData)
        });
    },

    async getAll(query = '') {
        const url = query ? `${API.personsRead}?${query}` : API.personsRead;
        return apiRequest(url);
    }
    ,

    async update(id, updates) {
        return apiRequest(`${API.personsUpdate}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }
    ,

    async delete(id) {
        return apiRequest(`${API.personsDelete}/${id}`, {
            method: 'DELETE'
        });
    }

};

// Módulo de Logs
const LogsAPI = {
    async getAll() {
        return apiRequest(`${API.logs}`);
    },

    async create(action, details) {
        return apiRequest(`${API.logs}`, {
            method: 'POST',
            body: JSON.stringify({
                user: 1,
                action,
                details: JSON.stringify(details)
            })
        });
    }
};