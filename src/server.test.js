test("Server start:", async() =>{
    const response = await fetch('http://localhost:3000/status')
    expect(response.status).toBe(200)
})