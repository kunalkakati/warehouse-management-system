# Orion - A Warehouse Management System 

A robust, full-stack web application designed to streamline daily warehouse operations, track inventory, and manage logistics efficiently. This system simplifies the workflow for Data Entry Operators and warehouse managers by providing an intuitive interface for complex logistics tasks.

## 🚀 Features
- **Goods In & Out Management:** Accurately track incoming shipments, outgoing dispatch, and current stock with real-time logging.
- **BTS System Management:** Built-in modules for managing, tracking, and syncing with internal BTS systems.
- **Real-Time Inventory Dashboard:** Clear visibility into current stock levels, storage locations, and capacity limits.
- **Role-Based Access Control:** Secure, authenticated access tailored for Data Entry Operators, Floor Staff, and Admins.
- **Reporting & Analytics:** Generate automated daily reports for all warehouse movements and system audits.

## 💻 Tech Stack
- **Framework:** Next.js (App Router, Server Actions)
- **Database:** PostgreSQL (for robust relational inventory tracking)
- **ORM:** Drizzle
- **Language:** JavaScript

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/warehouse-management-system.git
   cd warehouse-management-system
   ```

2. **Install Dependencies:**
   Navigate to both the client and server directories to install the required packages.
   ```bash
   # In the root/server directory
   bun install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your database URIs and port configuration:
   ```env
   PORT=5000
   DATABASE_URL=your_postgresql_connection_string
   BETTER_AUTH_SECRET=your_better_auth_secret
   BETTER_AUTH_URL=your_better_auth_url
   ```

4. **Run the Application:**
   ```bash
   # Run application
   bun run dev
   ```

## 📈 Future Scope
- Role-Based Access Control (RBAC) for auditing and seamless operation.
- Utilizes an append-only event sourcing architecture to track all Goods In/Out movements, eliminating race conditions and maintaining a 100% verifiable audit trail.
- Multi-warehouse location support.

## 👤 Author
**Kunal**
Full-Stack Web Developer
