#!/usr/bin/env python
"""Initialize admin credentials in the database."""

import sys
from app.config import ADMIN_USERNAME, ADMIN_PASSWORD
from app.database import get_raw_conn, release_conn
from app.routers.auth import pwd_context, _set_admin_password

def init_admin_credentials():
    """Create or update admin credentials in the database."""
    conn = None
    try:
        conn = get_raw_conn()
        conn.autocommit = True
        
        # Set admin password (which creates/updates the record)
        _set_admin_password(conn, ADMIN_PASSWORD)
        
        print(f"✓ Admin credentials initialized successfully!")
        print(f"  Username: {ADMIN_USERNAME}")
        print(f"  Password: {'*' * len(ADMIN_PASSWORD)}")
        print("\nYou can now login with these credentials.")
        
    except Exception as e:
        print(f"✗ Error initializing admin credentials: {str(e)}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        if conn:
            release_conn(conn)

if __name__ == "__main__":
    init_admin_credentials()
