#!/usr/bin/env python
"""Test login endpoint directly."""

import json
import urllib.request
import urllib.error

def test_login_endpoint():
    try:
        url = "http://localhost:8000/api/auth/login"
        payload = {
            "username": "admin@gmail.com",
            "password": "admin123"
        }
        
        print(f"Testing login endpoint: {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        try:
            response = urllib.request.urlopen(req)
            status_code = response.status
            response_body = response.read().decode('utf-8')
        except urllib.error.HTTPError as e:
            status_code = e.code
            response_body = e.read().decode('utf-8')
        
        print(f"\nStatus Code: {status_code}")
        print(f"Response Body: {response_body}")
        
        if 200 <= status_code < 300:
            print("\n✓ Login successful!")
            print(json.dumps(json.loads(response_body), indent=2))
        else:
            print("\n✗ Login failed!")
            
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_login_endpoint()
