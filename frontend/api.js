// Configuración de APIs
const API = {
    auth: 'http://localhost:4001/api/auth',
    persons: 'http://localhost:4002/api/persons',
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
        return apiRequest(`${API.persons}`, {
            method: 'POST',
            body: JSON.stringify({ ...personData, user_id: 1 })
        });
    },

    async getAll(query = '') {
        const url = query ? `${API.persons}?${query}` : API.persons;
        return apiRequest(url);
    },

    async update(id, updates) {
        return apiRequest(`${API.persons}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ ...updates, user_id: 1 })
        });
    },

    async delete(id) {
        return apiRequest(`${API.persons}/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ user_id: 1 })
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