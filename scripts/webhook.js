document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('citizenship-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Generate reference number
            const refNumber = 'MRD-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
            
            // Prepare Discord webhook payload
            const payload = {
                embeds: [{
                    title: "New Citizenship Application",
                    color: 0x1a5fb4,
                    fields: [
                        { name: "Full Name", value: data['full-name'] || "Not provided", inline: true },
                        { name: "Date of Birth", value: data.dob || "Not provided", inline: true },
                        { name: "Gender", value: data.gender || "Not provided", inline: true },
                        { name: "Place of Birth", value: data.birthplace || "Not provided", inline: true },
                        { name: "Current Nationality", value: data['current-nationality'] || "Not provided", inline: true },
                        { name: "Email", value: data.email || "Not provided", inline: true },
                        { name: "Phone", value: data.phone || "Not provided", inline: true },
                        { name: "Address", value: data.address || "Not provided" },
                        { name: "Discord", value: data.discord || "Not provided", inline: true },
                        { name: "Education", value: data.education || "Not provided", inline: true },
                        { name: "Occupation", value: data.occupation || "Not provided", inline: true },
                        { name: "Criminal Record", value: data['criminal-record'] === 'yes' ? "Yes\n" + (data['criminal-description'] || "No details") : "No", inline: true },
                        { name: "Reason for Application", value: data.reason || "Not provided" },
                        { name: "Planned Contribution", value: data.contribution || "Not provided" },
                        { name: "Reference Number", value: refNumber }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };
            
            try {
                // Send to Discord webhook
                const response = await fetch('https://discord.com/api/webhooks/1357942233210421298/XeExevAvyshnp1AseNVsnrhM6V90C7ag3HIqhh4scELX-pMt5FTrOdG8E4pYqZApQqiw', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    // Hide form and show success message
                    form.style.display = 'none';
                    document.querySelector('.form-success').style.display = 'block';
                    document.getElementById('reference-number').textContent = refNumber;
                    document.querySelector('.form-success').scrollIntoView({ behavior: 'smooth' });
                } else {
                    throw new Error('Failed to send application');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your application. Please try again later.');
            }
        });
    }
});
