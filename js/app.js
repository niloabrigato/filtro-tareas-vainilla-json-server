const issueUrl = 'http://localhost:8000/issues'

const search_opt = document.getElementById('search_opt')

let selectedValue

search_opt.addEventListener('change', (event) => {
  selectedValue = parseInt(event.target.value)
})

fetch(issueUrl)
  .then((response) => {
    return response.json()
  })
  .then((issuesRecibed) => {
    const issues = structuredClone(issuesRecibed)

    let selectedValue = 0
    const tableBody = document.getElementById('table-body')
    issues.forEach((issue) => {
      const row = document.createElement('tr')
      row.innerHTML = `
				<td>${issue.id}</td>
				<td>${issue.title}</td>
				<td>${issue.description}</td>
				<td>${issue.asignated}</td>
				<td>${issue.priority}</td>
				<td>${issue.blocked ? issue.blocked : '-'}</td>
				<td>${issue.todoDate}</td>
				<td>${issue.inProgressDate}</td>
				<td>${issue.doneDate ? issue.doneDate : '-'}</td>
				<td>${issue.state}</td>
			`
      tableBody.appendChild(row)
    })
  })

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue
  input = document.getElementById('myInput')
  filter = input.value.toUpperCase()
  table = document.getElementById('myTable')
  tr = table.getElementsByTagName('tr')
  // const search_opt = document.getElementById('search_opt')

  // search_opt.addEventListener('change', (event) => {
  //   selectedValue = parseInt(event.target.value)
  // })

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    //   td = tr[i].getElementsByTagName('td')[0]
    td = tr[i].getElementsByTagName('td')[selectedValue]
    if (td) {
      txtValue = td.textContent || td.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ''
      } else {
        tr[i].style.display = 'none'
      }
    }
  }
}
