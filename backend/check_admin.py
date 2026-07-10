#!/usr/bin/env python
"""Check admin credentials in database."""

from app.database import get_raw_conn, release_conn
import psycopg2.extras

def check_admin():
    conn = None
    try:
        conn = get_raw_conn()
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute("SELECT username, password_hash FROM admin_credentials;")
            rows = cur.fetchall()
            if rows:
                for row in rows:
                    print(f"Username: {row['username']}")
                    print(f"Password Hash: {row['password_hash'][:50]}...")
            else:
                print("No admin credentials found in database!")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        if conn:
            release_conn(conn)

if __name__ == "__main__":
    check_admin()
