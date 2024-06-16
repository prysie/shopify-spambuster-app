import React from 'react';
import { Card, FormLayout, DataTable, DatePicker } from '@shopify/polaris';

class StatsTabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        startDate: new Date(), // Set startDate to current date
        endDate: new Date(), // Set endDate to current date
      }    
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleStartDateChange(value) {
    this.props.setStartDate(value);
  }

  handleEndDateChange(value) {
    this.props.setEndDate(value);
  }

  render() {
    const { startDate, endDate, recaptchaActivity } = this.props;

    return (
      <>
        <Card sectioned>
          <FormLayout>
            <FormLayout.Group>
              <DatePicker
                month={new Date().getMonth()}
                year={new Date().getFullYear()}
                onChange={this.handleStartDateChange}
                selected={startDate}
              />
              <DatePicker
                month={new Date().getMonth()}
                year={new Date().getFullYear()}
                onChange={this.handleEndDateChange}
                selected={endDate}
              />
            </FormLayout.Group>
          </FormLayout>
        </Card>
        <Card title="reCAPTCHA Activity Blotter" sectioned>
          <DataTable
            columnContentTypes={['text', 'text', 'text', 'numeric']}
            headings={['Timestamp', 'Action', 'Result', 'Score']}
            rows={recaptchaActivity.map(activity => [
              activity.timestamp,
              activity.action,
              activity.result,
              activity.score,
            ])}
          />
        </Card>
        <Card title="reCAPTCHA Activity Graph" sectioned>
          {/* Render the graph component here */}
        </Card>
      </>
    );
  }
}

export default StatsTabContent;