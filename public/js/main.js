var pageNumber = 1
var totalPage = 0



function getRequests(mode) {
    pageNumber=1
    let url = `/requests/${mode}`
    $("#content").empty()
    $("#skeleton").removeClass('d-none')
    ajax(url, 'GET', (data) => {
        data.total>10 ? $("#load_more_btn_parent").removeClass('d-none'): $("#load_more_btn_parent").addClass('d-none')
        totalPage = data.last_page
        addRequests(data.data,mode)
    })
}

function getMoreRequests(mode) {
    pageNumber = pageNumber+1
    let url = `/requests/${mode}?page=`
    $("#skeleton").removeClass('d-none')
    ajax(url+pageNumber, 'GET', (data) => {
        addRequests(data.data,mode)

    })
}
function addRequests(data,mode) {
    data.map((user,index) => {
        $("#content").append(`<div class="my-2 shadow  text-white bg-dark p-1" id="request_${index}">
              <div class="d-flex justify-content-between">
                <table class="ms-1">
                  <td class="align-middle">${user.name}</td>
                  <td class="align-middle"> - </td>
                  <td class="align-middle">${user.email}</td>
                  <td class="align-middle">
                </table>
                <div>
                ${mode==='sent' ?`<button id="cancel_request_btn_" onclick="deleteRequest(${user.id},${index})" class="btn btn-danger me-1"
          onclick="">Withdraw Request</button>`: `<button id="accept_request_btn_"  onclick="acceptRequest(${user.id},${index})" class="btn btn-primary me-1"
          onclick="">Accept</button>`}
                </div>
              </div>
            </div>`)
    })
    $("#skeleton").addClass('d-none')
    totalPage===pageNumber && $("#load_more_btn_parent").addClass('d-none')

}
function getConnections() {
    pageNumber=1
    $("#content").empty()
    $("#skeleton").removeClass('d-none')

    ajax('/getConnections', 'GET', (data) => {
        $("#get_suggestions_btn").empty()
        $("#get_suggestions_btn").append(`Suggestions (${data.total})`)
        data.length>10 ? $("#load_more_btn_parent").removeClass('d-none'): $("#load_more_btn_parent").addClass('d-none')
        totalPage = Math.ceil(data.length/10)
        addConnections(data)
    })}

function getMoreConnections() {
    pageNumber = pageNumber+1
    $("#skeleton").removeClass('d-none')
    ajax('/getConnections?page='+pageNumber, 'GET', (data) => {
        addSuggestions(data.data)

    })
}
function addConnections(data,mode) {
    data.map((user,index) => {
        $("#content").append(`<div class="my-2 shadow  text-white bg-dark p-1" id="connections_${index}">
              <div class="d-flex justify-content-between">
                <table class="ms-1">
                  <td class="align-middle">${user.name}</td>
                  <td class="align-middle"> - </td>
                  <td class="align-middle">${user.email}</td>
                  <td class="align-middle">
                </table>
                <div>
                 <button style="width: 220px" id="get_connections_in_common_" onclick="getConnectionsInCommon(${user.id},${index})" ${user.commonConnections==0 && 'disabled'} class="btn btn-primary" type="button"
                    data-bs-toggle="collapse" data-bs-target="#collapse_${index}" aria-expanded="false" aria-controls="collapseExample">
                    Connections in common (${user.commonConnections})
                  </button>
                  <button id="create_request_btn_" onclick="removeConnection(${user.id},${index})"  class="btn btn-danger me-1">Remove Connection</button>
                </div>
              </div>
              <div class="collapse" id="collapse_${index}">

    <div id="content_${index}" class="p-2">
    </div>
    <div id="connections_in_common_skeletons_" class="d-none">
<br>
    <span class="fw-bold text-white">Loading Skeletons</span>
    <div class="px-2" id="loading_${index}">

    </div>
        </div>
    <div class="d-flex justify-content-center w-100 py-2">
      <button class="btn btn-sm btn-primary" id="load_more_connections_in_common_${index}">Load
        more</button>
    </div>
  </div>
            </div>`)
    })
    $("#skeleton").addClass('d-none')
    totalPage===pageNumber && $("#load_more_btn_parent").addClass('d-none')

}
function getConnectionsInCommon(userId, connectionId) {
for(let i=0; i<10; i++){
    $("#loading_"+connectionId).append( `<div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px">
  <strong class="ms-1 text-primary">Loading...</strong>
  <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>
</div>`)
    }

    pageNumber=1
    $("#content_"+connectionId).empty()
    $("#connections_in_common_skeletons_").removeClass('d-none')

    ajax('/getCommonConnections/'+userId, 'GET', (data) => {
        $("#connections_in_common_skeletons_").addClass('d-none')
        data.length>10 ? $("#load_more_connections_in_common_"+connectionId).removeClass('d-none'): $("#load_more_connections_in_common_"+connectionId).addClass('d-none')
        totalPage = Math.ceil(data.length/10)
        data.map((user,index) => {
            $("#content_"+connectionId).append(`<div class="p-2 shadow rounded mt-2  text-white bg-dark">${user.name} - ${user.email}</div>`)

        })
    })

}

function getMoreConnectionsInCommon(userId, connectionId) {
    // Optional: Depends on how you handle the "Load more"-Functionality
    // your code here...
}
function addSuggestions(data) {
    data.map((user,index) => {
        $("#content").append(`<div class="my-2 shadow  text-white bg-dark p-1" id="suggestion_${index}">
              <div class="d-flex justify-content-between">
                <table class="ms-1">
                  <td class="align-middle">${user.name}</td>
                  <td class="align-middle"> - </td>
                  <td class="align-middle">${user.email}</td>
                  <td class="align-middle">
                </table>
                <div>
                  <button id="create_request_btn_" onclick="sendRequest(${user.id},${index})" class="btn btn-primary me-1">Connect</button>
                </div>
              </div>
            </div>`)
    })
    $("#skeleton").addClass('d-none')
    totalPage===pageNumber && $("#load_more_btn_parent").addClass('d-none')

}
function getSuggestions() {
    pageNumber=1
    $("#content").empty()
    $("#skeleton").removeClass('d-none')

    ajax('/getSuggestions', 'GET', (data) => {
        $("#get_suggestions_btn").empty()
        $("#get_suggestions_btn").append(`Suggestions (${data.total})`)
        data.total>10 ? $("#load_more_btn_parent").removeClass('d-none'): $("#load_more_btn_parent").addClass('d-none')
        totalPage = data.last_page
        addSuggestions(data.data)
    })
}

function getMoreSuggestions() {
    pageNumber = pageNumber+1
    $("#skeleton").removeClass('d-none')
    ajax('/getSuggestions?page='+pageNumber, 'GET', (data) => {
        addSuggestions(data.data)

    })

}

function sendRequest(userId, suggestionId) {
    let form = new FormData()
    form.append('user_id',userId)
    $("#suggestion_"+suggestionId).remove()
    ajax('/sendRequest', 'POST', (data) => {
    },form)

}

function deleteRequest(userId, requestId) {
    $("#request_"+requestId).remove()
    ajax('/requests/delete/'+userId, 'GET', (data) => {
    })
}

function acceptRequest(userId, requestId) {
    $("#request_"+requestId).remove()
    ajax('/requests/accept/'+userId, 'GET', (data) => {
    })
}

function removeConnection(userId, connectionId) {
    $("#connections_"+connectionId).remove()
    ajax('/connections/delete/'+userId, 'GET', (data) => {
    })
}

$(function () {
    getSuggestions();
    $("#get_suggestions_btn").on('click',()=>{
        $("#load_more_btn").attr("onclick","getMoreSuggestions()")
        getSuggestions()
    })
    $("#get_sent_requests_btn").on('click',()=>{
        $("#load_more_btn").attr("onclick","getMoreRequests('sent')")
        getRequests('sent')
    })
    $("#get_received_requests_btn").on('click',()=>{
        $("#load_more_btn").attr("onclick","getMoreRequests('received')")
        getRequests('received')
    })
    $("#get_connections_btn").on('click',()=>{
        $("#load_more_btn").attr("onclick","getMoreConnections()")
        getConnections()
    })



});
