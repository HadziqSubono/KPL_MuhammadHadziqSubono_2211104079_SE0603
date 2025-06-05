const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const USERS_FILE = 'users.json';

// Load users from JSON file
function loadUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { users: [] };
    }
}

// Save users to JSON file
function saveUsers(data) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
    console.log('Data berhasil disimpan ke users.json\n');
}

// Hash password
function hashPassword(password) {
    return crypto.createHash('sha256').update(password + 'modul15salt').digest('hex');
}

// Validate username
function validateUsername(username) {
    const errors = [];
    
    if (username.length < 3 || username.length > 20) {
        errors.push('Username harus 3-20 karakter');
    }
    
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errors.push('Username hanya boleh huruf dan angka');
    }
    
    return errors;
}

// Validate password
function validatePassword(password, username) {
    const errors = [];
    
    if (password.length < 8 || password.length > 20) {
        errors.push('Password harus 8-20 karakter');
    }
    
    if (!/[!@#$%^&*]/.test(password)) {
        errors.push('Password harus mengandung minimal 1 karakter khusus (!@#$%^&*)');
    }
    
    if (!/\d/.test(password)) {
        errors.push('Password harus mengandung minimal 1 angka');
    }
    
    if (!/^[\x20-\x7E]+$/.test(password)) {
        errors.push('Password hanya boleh karakter ASCII');
    }
    
    if (username && password.toLowerCase().includes(username.toLowerCase())) {
        errors.push('Password tidak boleh mengandung username');
    }
    
    return errors;
}

// Register function
function register() {
    console.log('\n=== REGISTRASI USER ===');
    
    rl.question('Username: ', (username) => {
        rl.question('Password: ', (password) => {
            
            // Validate inputs
            const usernameErrors = validateUsername(username);
            const passwordErrors = validatePassword(password, username);
            
            if (usernameErrors.length > 0) {
                console.log('\nError Username:');
                usernameErrors.forEach(error => console.log('- ' + error));
                showMenu();
                return;
            }
            
            if (passwordErrors.length > 0) {
                console.log('\nError Password:');
                passwordErrors.forEach(error => console.log('- ' + error));
                showMenu();
                return;
            }
            
            // Load existing users
            const data = loadUsers();
            
            // Check if username exists
            if (data.users.find(u => u.username === username)) {
                console.log('\nUsername sudah digunakan!\n');
                showMenu();
                return;
            }
            
            // Add new user
            const newUser = {
                username: username,
                password: hashPassword(password),
                createdAt: new Date().toISOString()
            };
            
            data.users.push(newUser);
            saveUsers(data);
            
            console.log(`Registrasi berhasil! User "${username}" telah ditambahkan.\n`);
            showMenu();
        });
    });
}

// Login function
function login() {
    console.log('\n=== LOGIN USER ===');
    
    rl.question('Username: ', (username) => {
        rl.question('Password: ', (password) => {
            
            const data = loadUsers();
            const hashedPassword = hashPassword(password);
            
            const user = data.users.find(u => 
                u.username === username && u.password === hashedPassword
            );
            
            if (user) {
                console.log(`\nLogin berhasil! Selamat datang, ${username}!`);
                console.log(`Akun dibuat: ${new Date(user.createdAt).toLocaleString()}\n`);
            } else {
                console.log('\nUsername atau password salah!\n');
            }
            
            showMenu();
        });
    });
}

// Show all users (for testing)
function showUsers() {
    const data = loadUsers();
    
    console.log('\n=== DATA USERS ===');
    console.log(`Total users: ${data.users.length}`);
    
    if (data.users.length > 0) {
        data.users.forEach((user, index) => {
            console.log(`${index + 1}. Username: ${user.username}`);
            console.log(`   Created: ${new Date(user.createdAt).toLocaleString()}`);
        });
    } else {
        console.log('Belum ada user yang terdaftar.');
    }
    
    console.log('');
    showMenu();
}

// Main menu
function showMenu() {
    console.log('================================');
    console.log('  SECURE AUTH APP - MODUL 15   ');
    console.log('================================');
    console.log('1. Registrasi User');
    console.log('2. Login User');
    console.log('3. Lihat Data Users');
    console.log('4. Keluar');
    console.log('================================');
    
    rl.question('Pilih menu (1-4): ', (choice) => {
        switch (choice) {
            case '1':
                register();
                break;
            case '2':
                login();
                break;
            case '3':
                showUsers();
                break;
            case '4':
                console.log('\nTerima kasih telah menggunakan Secure Auth App!');
                rl.close();
                break;
            default:
                console.log('\nPilihan tidak valid!\n');
                showMenu();
        }
    });
}

// Start application
console.log('Memulai Secure Auth App...\n');
showMenu();