# Berkshare Hackaway

Vulnerable applications for educational purposes.

## Security Vulnerabilities

### Prototype Pollution

The banking web application uses a stringified JSON string to store
metadata about memos.

### Path Traversal

In a banking web application we are building, we are going to 
implement a feature that allows customers to create their
financial account statement from the bank. This capability
involves generating a PDF file that contains the customer's 
name. As part of a cybersecurity educational awareness session
we want to theorize a flow in the system that involves a
double encoding security vulnerability in a directory traversal
workflow that relates to the system's ability to generate the
PDF file.
