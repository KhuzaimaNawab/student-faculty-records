const express = require('express')
const fs = require('fs')
const env = require('dotenv').config()
const bodyParse = require('body-parser')

const app = express();

const port = process.env.PORT || 3001
const path = "./data/"

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.get('/api/students', (req, res) => {
    fs.readFile(`${path}student.json`, "utf-8", (err, data) => {
        if (err) {
            console.log(err)
        }
        res.json(JSON.parse(data))
        res.end()
    })

})

app.get('/api/faculty', (req, res) => {
    fs.readFile(`${path}faculty.json`, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        res.json(JSON.parse(data))
        res.end()
    })
})


app.post('/api/students', (req, res) => {

    fs.readFile(`${path}student.json`, "utf-8", (err, data) => {
        if (err) {
            res.status(500).json({ "message": "Failed to read data from file" })
            console.log(err)
        } else {
            let parsedData = JSON.parse(data)
            parsedData.Students.push(req.body)
            let updatedData = JSON.stringify(parsedData, null, 2);

            fs.writeFile(`${path}student.json`, updatedData, "utf-8", (err) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to write data to file' });
                } else {
                    res.json({ message: 'Data written to file successfully' });
                }
            })
        }
    })
})

app.post('/api/faculty', (req, res) => {

    fs.readFile(`${path}faculty.json`, "utf-8", (err, data) => {
        if (err) {
            res.status(500).json({ "message": "Failed to read data from file" })
            console.log(err)
        } else {
            let parsedData = JSON.parse(data)
            parsedData.Students.push(req.body)
            let updatedData = JSON.stringify(parsedData, null, 2);

            fs.writeFile(`${path}faculty.json`, updatedData, "utf-8", (err) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to write data to file' });
                } else {
                    res.json({ message: 'Data written to file successfully' });
                }
            })
        }
    })
})

app.put('/api/students/:id', (req, res) => {
    fs.readFile(`${path}student.json`, 'utf-8', (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Failed to read file' });
      } else {
        let parsedData = JSON.parse(data);
        let id = req.params.id;
        let studentIndex = parsedData.Students.findIndex((student) => student.id === id);
  
        if (studentIndex !== -1) {
          parsedData.Students[studentIndex].name = req.body.name;
  
          let updatedData = JSON.stringify(parsedData);
  
          fs.writeFile(`${path}student.json`, updatedData, (err) => {
            if (err) {
              res.status(500).json({ message: 'Failed to write file' });
            } else {
              res.status(200).json({ message: 'Record updated successfully' });
            }
          });
        } else {
          res.status(404).json({ error: 'Student not found' });
        }
      }
    });
});
  
app.put('/api/faculty/:id', (req, res) => {
    fs.readFile(`${path}faculty.json`, 'utf-8', (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Failed to read file' });
      } else {
        let parsedData = JSON.parse(data);
        let id = req.params.id;
        let facultyIndex = parsedData.Faculty.findIndex((faculty) => faculty.id === id);
  
        if (facultyIndex !== -1) {
          parsedData.Faculty[facultyIndex].name = req.body.name;
  
          let updatedData = JSON.stringify(parsedData);
  
          fs.writeFile(`${path}faculty.json`, updatedData, (err) => {
            if (err) {
              res.status(500).json({ message: 'Failed to write file' });
            } else {
              res.status(200).json({ message: 'Record updated successfully' });
            }
          });
        } else {
          res.status(404).json({ error: 'Faculty member not found' });
        }
      }
    });
  });
  

app.delete('/api/students/:id', (req, res) => {
    fs.readFile(`${path}student.json`, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Failed to read file' });
        } else {
            let parsedData = JSON.parse(data);
            let id = req.params.id;
            let studentIndex = parsedData.Students.findIndex((student) => student.id === id);

            if (studentIndex !== -1) {
                parsedData.Students.splice(studentIndex, 1);

                fs.writeFile(`${path}student.json`, JSON.stringify(parsedData), (err) => {
                    if (err) {
                        res.status(500).json({ message: 'Failed to write file' });
                    } else {
                        res.json({ message: "Record deleted succesfully" })
                        res.status(204).end();
                    }
                });
            } else {
                res.status(404).json({ error: 'Student not found' });
            }
        }
    });
});

app.delete('/api/faculty/:id', (req, res) => {
    fs.readFile(`${path}faculty.json`, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Failed to read file' });
        } else {
            let parsedData = JSON.parse(data);
            let id = req.params.id;
            let facultyIndex = parsedData.Students.findIndex((faculty) => faculty.id === id);

            if (facultyIndex !== -1) {
                parsedData.Faculty.splice(facultyIndex, 1);

                fs.writeFile(`${path}faculty.json`, JSON.stringify(parsedData), (err) => {
                    if (err) {
                        res.status(500).json({ message: 'Failed to write file' });
                    } else {
                        res.json({ message: "Record deleted succesfully" })
                        res.status(204).end();
                    }
                });
            } else {
                res.status(404).json({ error: 'Faculty member not found' });
            }
        }
    });
});


app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

