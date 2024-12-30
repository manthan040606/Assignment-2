let appointments = [];

document.querySelector('#addAppointmentBtn').addEventListener('click', function() {
    const clientName = document.getElementById('clientName').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const serviceType = document.getElementById('serviceType').value; // Corrected here

    addAppointment(clientName, appointmentTime, serviceType);

    // Clear input fields after adding appointment
    document.getElementById("clientName").value = '';
    document.getElementById("appointmentTime").value = '';
    document.getElementById("serviceType").value = '';
});

function addAppointment(clientName, appointmentTime, serviceType) {
    try {
        if (!clientName || !serviceType) {
            throw new Error("Client name and service type cannot be empty.");
        }

        const appointmentDate = new Date(appointmentTime);   // Convert the string to a Date object

        if (isNaN(appointmentDate)) {
            throw new Error("Invalid appointment time.");
        }

        appointments.push({
            clientName: clientName,
            appointmentTime: appointmentDate,
            serviceType: serviceType,
        });

        console.log("Appointment added:", { clientName, appointmentTime, serviceType });
        scheduleReminder(appointmentDate, serviceType, clientName);
        displayUpcomingAppointments();
    } catch (error) {
        console.error(error.message);
    }
}

function scheduleReminder(appointmentDate, serviceType, clientName) {
    // Calculate reminder time, e.g., 1 hour before the appointment
    const reminderTime = new Date(appointmentDate.getTime() - 60 * 60 * 1000); // 1 hour before
    const now = new Date();

    if (reminderTime > now) {
        const timeUntilReminder = reminderTime - now;
        setTimeout(() => {
            alert(`Reminder: You have an appointment for ${serviceType} with ${clientName} at ${appointmentDate}`);
        }, timeUntilReminder);
    } else {
        console.log(`Reminder time has already passed for ${serviceType} with ${clientName}.`);
    }
}

function displayUpcomingAppointments() {
    const appointmentsList = document.getElementById("appointmentsList");
    appointmentsList.innerHTML = ""; // Clear the current list

    const sortedAppointments = appointments.sort((a, b) => a.appointmentTime - b.appointmentTime);
    sortedAppointments.forEach(appointment => {
        const listItem = document.createElement("li");
        listItem.textContent = `${appointment.clientName} - ${appointment.serviceType} at ${appointment.appointmentTime.toLocaleString()}`;
        appointmentsList.appendChild(listItem);
    });
}