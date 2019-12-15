function Post() {
    function handleEvent() {
        $(".delete_report").click(function (e) {
            let report_name = $(this).attr("report_name");
            let result = confirm(`Bạn muốn xáo báo cáo ${report_name}?`);
            if (result) {
                let report_id = $(this).attr("report_id");
                console.log('report_id: ', report_id);

                let base_url = location.protocol + "//" + document.domain + ":" + location.port;

                $.ajax({
                    url: base_url + "/" + report_id,
                    type: "DELETE",
                    dataType: "json",
                    success: function (res) {
                        if (res && res.status_code == 200) {
                            location.reload();
                        } else {
                            console.log("error");

                        }
                    }
                })
            }

        })
    }

    handleEvent();
}

$(document).ready(() => {
    new Post();
})