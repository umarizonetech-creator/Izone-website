#!/usr/bin/env python
"""Test admin password verification."""

from app.config import ADMIN_USERNAME, ADMIN_PASSWORD
from app.database import get_raw_conn, release_conn
from app.routers.auth import _verify_admin_password

def test_login():
    conn = None
    try:
        conn = get_raw_conn()
        
        print(f"Testing login with:")
        print(f"  Username: {ADMIN_USERNAME}")
        print(f"  Password: {ADMIN_PASSWORD}")
        
        result = _verify_admin_password(conn, ADMIN_USERNAME, ADMIN_PASSWORD)
        print(f"\nVerification result: {result}")
        
        if result:
            print("✓ Password verification successful!")
        else:
            print("✗ Password verification failed!")
            
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        if conn:
            release_conn(conn)

if __name__ == "__main__":
    test_login()
