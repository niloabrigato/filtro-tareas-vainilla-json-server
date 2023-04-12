const issueUrl = 'http://localhost:3000/issues'

const search_opt = document.getElementById('search_opt')

let selectedValue

search_opt.addEventListener('change', (event) => {
  selectedValue = parseInt(event.target.value)
})

try {
  fetch(issueUrl)
    .then((response) => {
      return response.json()
    })
    .then((issuesRecibed) => {
      let issues = structuredClone(issuesRecibed)

      /**orden fecha inprogress ascendente */
      const sortedArray = issues.sort(function (a, b) {
        return (
          new Date(a.inProgressDate).getTime() -
          new Date(b.inProgressDate).getTime()
        )
      })

      // /**orden fecha inprogress descendente */
      // const sortedArray  = issues.sort(function(a, b) {
      //   return new Date(b.inProgressDate).getTime() - new Date(a.inProgressDate).getTime();
      // });

      console.log(sortedArray)

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
				<td style="color:red;">${issue.blocked ? issue.blocked : '-'}</td>
				<td>${issue.todoDate}</td>
				<td>${issue.inProgressDate ? issue.inProgressDate : '-'}</td>
				<td>${issue.doneDate ? issue.doneDate : '-'}</td>
				<td>${stateStyle(issue.state)}</td>
				<td>${
          issue.comments
            ? `<a target="_blank" href='http://localhost:3000/issues/${issue.id}'>más...</a>`
            : '-'
        }</td>
			`
        tableBody.appendChild(row)
      })
    })
} catch (error) {
  console.log(error)
}

function stateStyle(state) {
  switch (state) {
    case 'Pendiente':
      {
        return `<span class="pendiente">${state}</span>`
      }
      break
    case 'En progreso':
      {
        return `<span class="enprogreso">${state}</span>`
      }
      break
    case 'Terminado':
      {
        return `<span class="terminado">${state}</span>`
      }
      break

    default:
      break
  }
}

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue
  input = document.getElementById('myInput')
  filter = input.value.toUpperCase()
  table = document.getElementById('myTable')
  tr = table.getElementsByTagName('tr')

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
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
